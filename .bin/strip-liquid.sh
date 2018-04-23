#!/usr/bin/env bash
tr -d '\n' < $1 \
  | tr -s ' ' \
  | sed $'s/; /;/g; s/, /,/g' > $2
#  s/-->/\x02/g; s/\x01[^\x01]*\x02//g