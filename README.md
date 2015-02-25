# EssentiaSampleWeb
this is sample web application for [Essentia](https://github.com/MTG/essentia).
detect beats of the sound of SoundCloud and play.

python + essentia + node + express


Requirement
---------------------------------------
- node
- python
    - essentia


Configuration
---------------------------------------
this app requires your SoundCloud API Client id and secret.
you need registeration as SoundCloud API Client [here](http://soundcloud.com/you/apps/new)

after that, create config file into config/local.yml.
this is exsample of local.yml (because this file is read by config module, so [there are some other acceptable file formats](https://github.com/lorenwest/node-config/wiki/Configuration-Files))

```yml
soundcloud
  id: xxxxxxxxxxxx
  secret: yyyyyyyyyyy
```



Run
---------------------------------------
use ```npm start``` then application will be running on 3000 port
after http server wake up access http://localhost:3000/tracks on your browser (sorry for IE :-<)


Run
---------------------------------------
```npm test```


Resouces
----------------------------------------

## Test Sounds
[風雷神](http://www.hurtrecord.com/bgm/17/fooraijin.html) from http://www.hurtrecord.com/
