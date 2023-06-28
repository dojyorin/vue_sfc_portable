#!/bin/sh
set -eu

cd ${0%/*}

esbuild ../mod.ts --bundle --format=esm > ../example/bundle.js