#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

die () {
    echo >&2 "$@"
    exit 1
}

version_type=$1
valid=("major\tminor\tpatch")

[ "$#" -eq 1 ] || die "1 argument required, $# provided"
[[ "\t${valid[@]}\t" =~ "\t${version_type}\t" ]] || die "must be major, minor, or patch"

echo "version ${version_type}"

yarn version "--${version_type}"
git add package.json
cat package.json | jq .version | xargs $DIR/tag.sh
