#!/bin/bash
home_path=$1
repo_path=$2
documentation_path=$3
cd $home_path
echo "## *Clonning branch dev*"
cd $repo_path
git pull bb dev
echo "## *Updating documentation*"
cd $home_path
# docker run --rm -v "$home_path":/app seymourlabs/apidocjs apidoc -i "$repo_path" -o "$documentation_path"
/usr/local/bin/apidoc -i "$repo_path" -o "$documentation_path" | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g"
echo "## *Deploy successfully finished*"