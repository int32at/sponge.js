window.sponge.common = {};

window.sponge.common =
(->
  spVersion: if SP? then parseInt(SP.ClientSchemaVersions.currentVersion) else "12"
)()