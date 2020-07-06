#!/usr/bin/env bash

tag=$1

if [ -z "$tag" ]
then
    echo "Showing latest tags for reference:"
    TAGS=$(git fetch --tags && git tag | gsed '/-/!{s/$/_/}' | sort -V | sed 's/_$//'  | tail -n 5)

    echo "$TAGS"

    echo -n "Tag name [in format x.x.x]? "
    read IN_VERSION
    VERSION="v$IN_VERSION"
else
    VERSION="v${tag}"
fi


echo "Releasing $VERSION"

git commit --allow-empty -m "Release $VERSION"
git tag $VERSION -m "Tagging version $VERSION for release"
git push --tags
git push
hub release create -m "$VERSION" $VERSION
echo "Released $VERSION"