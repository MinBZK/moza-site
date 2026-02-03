#!/bin/bash

# Ensure we are in the project root
ROOT_DIR=$(pwd)
GEN_DIR=".generated"

# Configuration: source_folder:target_folder
DOCS_MAPPING=(
    "IAM"
    "profielservice"
    "portaal"
    "notificatieservice"
)

# Clean and recreate generated directory
rm -rf "$GEN_DIR"
mkdir -p "$GEN_DIR/documentatie/beslissingen/"

# 1. Copy decisions to .generated/documentatie/beslissingen/ as Page Bundles
echo "Copying decisions to $GEN_DIR..."

for f in structurizr/decisions/*.md; do
    if [ -f "$f" ]; then
        filename=$(basename "$f" .md)
        # Convert to lowercase and replace spaces with hyphens to match Hugo's default URL behavior
        dirname=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

        BUNDLE_DIR="$GEN_DIR/documentatie/beslissingen/$dirname"
        mkdir -p "$BUNDLE_DIR/images"

        # Copy markdown as index.md to create a leaf bundle
        cp -v "$f" "$BUNDLE_DIR/index.md"

        # Copy images to the bundle's images folder
        cp -v structurizr/decisions/images/* "$BUNDLE_DIR/images/" 2>/dev/null
    fi
done

# Copy images to a central folder as well (optional, but keeps compatibility)
mkdir -p "$GEN_DIR/documentatie/beslissingen/images"
cp -v structurizr/decisions/images/* "$GEN_DIR/documentatie/beslissingen/images/" 2>/dev/null || echo "No decision images found."

# 2. Copy documentation folders
for folder in "${DOCS_MAPPING[@]}"; do
    echo "Processing $folder to $GEN_DIR/documentatie/$folder..."

    TARGET_PATH="$GEN_DIR/documentatie/$folder"
    mkdir -p "$TARGET_PATH"

    if [ -d "structurizr/$folder" ]; then
        echo "---" > "$TARGET_PATH/_index.md"
        echo "title: \"$folder\"" >> "$TARGET_PATH/_index.md"
        echo "---" >> "$TARGET_PATH/_index.md"
        echo "" >> "$TARGET_PATH/_index.md"
        find "structurizr/$folder" -type f -name "*.md" ! -name "_*" | sort -V | xargs cat >> "$TARGET_PATH/_index.md"
        mkdir -p "$TARGET_PATH/images"
        find "structurizr/$folder" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.gif" \) -exec cp -v {} "$TARGET_PATH/images/" \;
    else
        echo "Warning: Source structurizr/$folder not found."
    fi
done

# 3. Apply sed replacements for structurizr diagrams in the generated folder
echo "Updating diagram embeds in $GEN_DIR..."
find "$GEN_DIR" -type f -name "*.md" -exec sed -i 's|!\[.*\](embed:\(.*\))|{{< diagram "\1" >}}|g' {} +

echo "Done! You can now run 'hugo server'."
