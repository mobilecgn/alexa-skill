.PHONY: build

build:
	rm -fv build.zip
	yarn run build
	cp -v package.json build/package.json
	cd build && yarn install --production
	cd build && zip -r ../build.zip .
