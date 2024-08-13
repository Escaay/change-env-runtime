#!/usr/bin/env node
"use strict";

import { program } from 'commander'
import changeEnv from './change/command'
import changeHelp from './change/help'
changeEnv(program)
changeHelp(program)
program.parse(process.argv)
