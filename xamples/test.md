---
title: Test Page
collection: home
partial: digest
---

Some sticky content for test

Now we can reuse partials that fall in the common template of a digest "card"

By passing `collection` we specify to the digest partial which colletion we want to use

By passing `digest` we can load that digest in the `master` layout, and of course
if no partial is specifed we have an `else` condition that just loads the content.

Lastly we can remove the `layout` property and use the `master` layout as default,
and override this on a per-page basis, as with `login`, where neccessary...

Omitting `layout: master.html`
