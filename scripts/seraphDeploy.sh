#!/usr/bin/env nix-shell
#!nix-shell -i bash -p go

tar -xzf "/tmp/catsky/catskyweb.tar.gz" -C "/opt/catsky/" --strip-components=1 --overwrite
sudo systemctl restart catsky.service
