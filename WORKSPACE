# The WORKSPACE file tells Bazel that this directory is a "workspace", which is like a project root.
# The content of this file specifies all the external dependencies Bazel needs to perform a build.

workspace(name = "ngx_bootstrap")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository", "new_git_repository")

http_archive(
    name = "io_bazel_rules_go",
    url = "https://github.com/bazelbuild/rules_go/releases/download/0.16.5/rules_go-0.16.5.tar.gz",
    sha256 = "7be7dc01f1e0afdba6c8eb2b43d2fa01c743be1b9273ab1eaf6c233df078d705"
)

#http_archive(
#    name = "build_bazel_rules_nodejs",
#    sha256 = "039c6fe27b53e2336ca77209c51e7f8aa64b7baf9f4bd7a383a780dc270237b1",
#    strip_prefix = "rules_nodejs-0.16.5",
#    url = "https://github.com/bazelbuild/rules_nodejs/archive/0.16.5.zip",
#)

git_repository(
    name = "build_bazel_rules_nodejs",
    remote = "https://github.com/DeveloperFromUkraine/rules_nodejs.git",
    commit = ""
)

ANGULAR_VERSION = "7.1.3"
http_archive(
    name = "angular",
    strip_prefix = "angular-%s" % ANGULAR_VERSION,
    url = "https://github.com/angular/angular/archive/%s.zip" % ANGULAR_VERSION,
)

RXJS_VERSION = "6.3.3"
http_archive(
    name = "rxjs",
    strip_prefix = "package/src",
    url = "https://registry.yarnpkg.com/rxjs/-/rxjs-%s.tgz" % RXJS_VERSION,
    sha256 = "72b0b4e517f43358f554c125e40e39f67688cd2738a8998b4a266981ed32f403"
)

RULES_SASS_VERSION = "1.15.2"
http_archive(
    name = "io_bazel_rules_sass",
    url = "https://github.com/bazelbuild/rules_sass/archive/%s.zip" % RULES_SASS_VERSION,
    strip_prefix = "rules_sass-%s" % RULES_SASS_VERSION,
)

####################################
# Load and install our dependencies downloaded above.

load("@angular//packages/bazel:package.bzl", "rules_angular_dependencies")
rules_angular_dependencies()

load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")
rules_typescript_dependencies()
# build_bazel_rules_nodejs is loaded transitively through rules_typescript_dependencies.

load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dependencies")
rules_nodejs_dependencies()

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories", "npm_install")
# 0.18.0 is needed for .bazelignore
check_bazel_version("0.22.0")

node_repositories()

npm_install(
    name = "npm",
    package_json = "//:package.json",
    package_lock_json="//:package-lock.json",
)

load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories", "web_test_repositories")
web_test_repositories()
browser_repositories(chromium = True, firefox = True)

load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace", "check_rules_typescript_version")
ts_setup_workspace()

load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
sass_repositories()

#Angular workspace
load("@angular//:index.bzl", "ng_setup_workspace")
ng_setup_workspace()

# Web testing
load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories", "browser_repositories")
web_test_repositories()
browser_repositories(
    chromium = True
)
