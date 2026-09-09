"""Validate chronicle data used by binary search."""

import json
import sys
from pathlib import Path


EVENTS_FILE = Path(__file__).resolve().parent.parent / "javascript" / "chronicle-events.json"
JDN_KEY = "Julian Day Number"


def main() -> int:
	with EVENTS_FILE.open(encoding="utf-8") as events_file:
		events = json.load(events_file)

	if not isinstance(events, list):
		print(f"{EVENTS_FILE}: expected a JSON array", file=sys.stderr)
		return 1

	previous_jdn = None
	previous_index = None
	errors = 0
	for index, event in enumerate(events):
		if not isinstance(event, dict) or JDN_KEY not in event:
			print(f"Event {index}: missing {JDN_KEY!r}", file=sys.stderr)
			errors += 1
			continue

		jdn = event[JDN_KEY]
		if not isinstance(jdn, (int, float)) or isinstance(jdn, bool):
			print(f"Event {index}: {JDN_KEY!r} must be numeric, got {jdn!r}", file=sys.stderr)
			errors += 1
			continue

		if previous_jdn is not None and jdn < previous_jdn:
			print(
				f"Event {index}: JDN {jdn} is lower than event {previous_index} JDN {previous_jdn}",
				file=sys.stderr,
			)
			errors += 1
		previous_jdn = jdn
		previous_index = index

	if errors:
		print(f"Found {errors} ordering error(s).", file=sys.stderr)
		return 1

	print(f"{len(events)} events are in non-decreasing Julian Day Number order.")
	return 0


if __name__ == "__main__":
	raise SystemExit(main())