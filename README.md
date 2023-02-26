# Project structure

## .nmprc

### Purpose:
To configure npm cli.

### Options:
-- save-exact=true 

The goal is to force installing only exact versions of the packages.

There are several ways to save packages:

```
"dependencies": {
  "some-library": "^3.4.11"
}
```

The `^` means that any time we run npm install again, npm will only update or dependency if there is a minor or patch change in the semantic versioning. 

```
"dependencies": {
  "some-library": "~3.4.11"
}
```

The library will be updated only if there is a patch change in the semantic versioning.

Semantic versioning is robust. It provides flexibility for the package developer to make features and bug fixes without negatively affecting the consumers with a major (breaking) change. The catch with NPM and semantic versioning is that we have to trust the developers who update the code to do the right thing.

Unfortunately, trusting open source developers can be a problem. Nothing stops a developer from making a breaking change during a bug fix.

```
"dependencies": {
  "some-library": "3.4.11"
}
```

The exact version library will be installed.

The `--save-exact=true` saves exact version of the package.

The upside of this approach is that we fully control the version of the package we install. It allows us to avoid getting accidently breaking changes with patch and minor updates.

Unfortunately, using --save-exact is also a sure-fire way to miss any patches or backwards-compatible features in your dependencies. If you choose to take the exact version approach, then be diligent about upgrading core packages over time.

## rollup.config.js

### Purpose:

To configure rollup bunder. Fair question would be why do we need the rollup bunder since we already have the TypeScript.

The first option for compiling `.ts` files is of course `tsc` and it does its job well, but there is one problem. Node requires us to specify extensions when using ES Modules, so we must import each file as import something from './something.js'. Using TypeScript we don't specify the extensions, as result the compiled code doesn't contain `.js` extensions as well which makes it impossible to run this code. This is why we need a bundler. After we bundle the code it appears in one common file.
