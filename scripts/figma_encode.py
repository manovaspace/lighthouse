#!/usr/bin/env python3
import json
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 tools/run_figma.py <path_to_js_file>")
        sys.exit(1)

    file_path = sys.argv[1]
    with open(file_path, "r", encoding="utf-8") as f:
        code = f.read()

    req = {
        "jsonrpc": "2.0",
        "id": 99,
        "method": "tools/call",
        "params": {
            "name": "figma_execute",
            "arguments": {
                "code": code
            }
        }
    }
    # Output single-line JSON with proper escaping
    print(json.dumps(req))

if __name__ == "__main__":
    main()
