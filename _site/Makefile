
export site_name="vcaldas.github.io"
export JEKYLL_VERSION=4.2.0
.PHONY: docker_build start build serve


serve:
	bundle exec jekyll serve
# create: 
# 	docker run \
# 	--rm --volume="${PWD}:/srv/jekyll" \
# 	-it jekyll/jekyll:${JEKYLL_VERSION} \
# 	sh -c "chown -R jekyll /usr/gem/ && jekyll new . --force" 

# build: 
# 	docker run --rm \
# 	--volume="${PWD}:/srv/jekyll" \
# 	-it jekyll/jekyll:${JEKYLL_VERSION} \
# 	jekyll build


# serve:	
# 	docker run --rm \
# 	--volume="${PWD}:/srv/jekyll" \
# 	--publish 3000:4000 \
# 	jekyll/jekyll:${JEKYLL_VERSION} \
# 	jekyll serve --watch


