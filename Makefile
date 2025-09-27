
# Open WebUI - Frontend Development Makefile

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

format:
	npm run format

clean:
	rm -rf node_modules build .svelte-kit

test:
	npm run test:frontend

update:
	@git pull
	npm install
	npm run build

