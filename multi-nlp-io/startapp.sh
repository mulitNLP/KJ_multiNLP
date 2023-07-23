
RESOURCES_PATH="./src/main/resources"

# cd basic-websocket-gameserver
mv_dir=$(dirname "$0")
cd ${mv_dir}
npm run build

# copy
cp -f  "${RESOURCES_PATH}/static/dist/index.html" "${RESOURCES_PATH}/templates/"

./gradlew clean build
java -jar build/libs/multi-nlp-io-0.0.1-SNAPSHOT.jar
