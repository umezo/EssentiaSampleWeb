#!/usr/bin/env python

# Copyright (C) 2006-2013  Music Technology Group - Universitat Pompeu Fabra
#
# This file is part of Essentia
#
# Essentia is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation (FSF), either version 3 of the License, or (at your
# option) any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
# details.
#
# You should have received a copy of the Affero GNU General Public License
# version 3 along with this program. If not, see http://www.gnu.org/licenses/

import json
import sys
from essentia.standard import *


# In this example we are going to look at how to perform beat tracking
# and mark extractred beats on the audio using the AudioOnsetsMarker algorithm.


# we're going to work with an input and output files specified as an argument in the command line
try:
    input_filename = sys.argv[1]
    output_filename = sys.argv[2]
    output_jsonname = sys.argv[3]
except:
    print "usage:", sys.argv[0], "<input-audiofile> <output-audiofile> <output-jsonname>"
    sys.exit()

# don't forget, we can actually instantiate and call an algorithm on the same line!
audio = MonoLoader(filename = input_filename)()

bt = BeatTrackerMultiFeature()
beats, _ = bt(audio)

marker = AudioOnsetsMarker(onsets = beats, type = 'beep')
marked_audio = marker(audio)
MonoWriter(filename=output_filename ,format='mp3')(marked_audio)

f = open(output_jsonname, 'w') 
f.write(json.dumps(beats.tolist()))
f.close() 

