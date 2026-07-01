"""Zet de scriptmap op sys.path zodat de modules importeerbaar zijn in tests."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
