export PATH := "./node_modules/.bin:" + env_var('PATH')

# lots of just -> yarn, but this lets us chain yarn command deps

[group('dist')]
dist-build-web: intl build-web

[group('dist')]
dist-build-android-sideload: intl build-android-sideload

[group('dist')]
dist-build-android-gradle: intl build-android-gradle

[group('build')]
intl:
    yarn intl:build

[group('build')]
prebuild-android:
    expo prebuild -p android

[group('build')]
build-web: && postbuild-web
    yarn build-web

[group('build')]
build-android-sideload: prebuild-android
    eas build --local --platform android --profile sideload-android

[group('build')]
[working-directory: 'android']
build-android-gradle: prebuild-android
    ./gradlew app:assembleRelease

[group('build')]
postbuild-web:
    # after doing the expo web build, we compress the bskyweb folder and send it to vps.
    # no need to build the go binary as we'll do that on vps.
    tar -czf catskyweb.tar.gz bskyweb/
    rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -o StrictHostKeyChecking=no" catskyweb.tar.gz ci@${VPS_IP}:/tmp/catsky/
    rsync -avz -e "ssh -i ~/.ssh/id_ed25519 -o StrictHostKeyChecking=no" scripts/seraphDeploy.sh ci@${VPS_IP}:/tmp/catsky/
    
[group('dev')]
dev-android-setup: prebuild-android
    yarn android

[group('dev')]
dev-web:
    yarn web

[group('dev')]
dev-web-functions: build-web
    wrangler pages dev ./web-build

[group('lint')]
typecheck:
    yarn typecheck
