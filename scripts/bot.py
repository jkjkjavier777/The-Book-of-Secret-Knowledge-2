#!/usr/bin/env python3
# Filename: scripts/bot.py
import json
import os
import random
import re
import sys

REPLIES_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "replies.json")


def load_replies():
    with open(REPLIES_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_replies(replies):
    with open(REPLIES_PATH, "w", encoding="utf-8") as f:
        json.dump(replies, f, indent=2)


def words(text):
    return set(re.sub(r"[^\w\s]", "", text.lower()).split())


def find_best_match(text, replies):
    exact_key = text.strip().lower()
    if exact_key in replies:
        return exact_key

    input_words = words(text)
    best_key = None
    best_score = 0.0

    for key in replies:
        key_words = words(key)
        if not key_words:
            continue
        overlap = len(key_words & input_words)
        score = overlap / len(key_words)
        if score > best_score and score >= 0.6:
            best_score = score
            best_key = key

    return best_key


def collapse(text, replies, state):
    match = find_best_match(text, replies)
    if not match:
        state["last_key"] = None
        state["last_reply"] = None
        return "I don't understand. Teach me with: teach: your phrase = your answer"

    options = replies[match]
    if match == state.get("last_key") and len(options) > 1:
        filtered = [o for o in options if o != state.get("last_reply")]
        choice = random.choice(filtered)
    else:
        choice = random.choice(options)

    state["last_key"] = match
    state["last_reply"] = choice
    return choice


def teach(text, replies):
    body = text[6:].strip()
    if "=" not in body:
        return "Format: teach: your phrase = your answer"
    phrase, answer = body.split("=", 1)
    phrase = phrase.strip().lower()
    answer = answer.strip()
    if not phrase or not answer:
        return "Format: teach: your phrase = your answer"

    replies.setdefault(phrase, []).append(answer)
    save_replies(replies)
    return f'Learned it. "{phrase}" now has {len(replies[phrase])} possible answer(s), saved permanently.'


def list_known_phrases(replies):
    phrases = list(replies.keys())
    lines = [f"JVI knows {len(phrases)} phrase(s):", ""]
    lines += [f"  - \"{p}\"" for p in phrases]
    return "\n".join(lines)


def main():
    replies = load_replies()

    if len(sys.argv) > 1:
        if "--list" in sys.argv:
            print(list_known_phrases(replies))
            return
        message = " ".join(sys.argv[1:])
        print(f"> {message}")
        if message.strip().lower().startswith("teach:"):
            print(teach(message, replies))
        else:
            print(collapse(message, replies, {}))
        return

    state = {"last_key": None, "last_reply": None}
    print('JVI: hi. Type a message, "teach: phrase = answer" to teach me, "list" to see what I know, or "exit" to quit.\n')

    while True:
        try:
            text = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nJVI: closing. Bye.")
            break

        lower = text.lower()
        if lower in ("exit", "quit"):
            print("JVI: closing. Bye.")
            break
        if not text:
            continue
        if lower == "list":
            print(list_known_phrases(replies) + "\n")
            continue
        if lower.startswith("teach:"):
            print("JVI: " + teach(text, replies) + "\n")
            continue

        print("JVI: " + collapse(text, replies, state) + "\n")


if __name__ == "__main__":
    main()
