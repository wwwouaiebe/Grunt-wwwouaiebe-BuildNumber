# Grunt-BuildNumber

Yet another build number plugin for grunt...

- Read properties from a json file, transform the properties with a given function  and add these properties to the grunt.config.data object
- Read properties from a json file, transform the properties with a given function  and write these properties to the json file

## What to do in your Gruntfile.js

In your Gruntfile.js, add a section named buildnumber to the data object passed into grunt.initConfig():

```
grunt.initConfig ( {
    buildnumber : {
        options : {
            file : 'buildNumber.json'
        },
        start : {
            action : 'read',
            values : [
                {
                    name : 'build',
                    initialValue : 0,
                    transform : value => String ( value ).padStart ( 5, '0' )
                }
            ]
        },
        end : {
            action : 'write',
            values : [
                {
                    name : 'build',
                    initialValue : 0,
                    transform : value => value + 1
                }
            ]
        }
    }
}
```

You have also to load the plugin:

```
grunt.loadNpmTasks('grunt-buildnumber');

```

And finally, register a task:

```
grunt.registerTask( 'a_task', [ 'buildnumber:start' ] );

```
or 


```
grunt.registerTask( 'another_task', [ 'buildnumber:end' ] );

```

## About the config

In the options, you precise the file used ( in the sample, __buildNumber.json__ ).

You can have multiple configurations ( in the sample, __start__ and __end__ ).

In each configuration, you precise witch action must be executed ( must be __'read'__ or __'write'__).

Then you add an array of objects that are the properties to read or write to the json file ( the __values__ in the sample ).

For each property :
- the __name__ is the the property name to read or write in the json file. Never use __buildnumber__ for this property name, that's the task name and the property will be ignored!
- the __initialValue__ is the value to use when the property is not found in the json file
- __transform__ is an optional function used to modify the property before writing the property in the grunt.config.data ( when the action is 'read' - in the sample, the numeric property is transformed into a string and completed with 0 on the left )
or before writing the property in the json file ( when the action is 'write' - in the sample the property is simply incremented )

Notice that the properties are added in the  __grunt.config.data object__, so you can easily use the properties in grunt templates or read the properties with the __grunt.config.get__ method










