# Rouge Me

#### By Ed Millington

This is a little rogue-lite project I'm working on to get better at JavaScript.

It's not guaranteed to work in all browsers at the mo, 'cause I'm learning myself a bit of ES6, which is super fun.

## Try it yourself

Open 'rouge.html' in Chrome, and use the arrow keys to wander about.

## What's happening?

You play the part of a friendly @ sign.

Watch out! You've been dropped into a maximum security area. Use your spidey senses to your advantage.

The game will tell you if you can see or hear a guard.

The game will also tell you if a guard sees or hears you.

Er.. that's it.

## Guard Alert Levels

Guards have two alert variables: Alert Level and Alert Count.

###Alert Level 

Alert Level starts at 0, and goes up in increments every time a guard is aware of you (+0.25 if she hears you, +0.5 if she sees you).

The idea is that, once Alert Level gets above 1, the guard will start chasing you. This is not implemented yet (beyond telling the guard the player's co-ordinates)

###Alert Count

This is a variable which counts the number of turns since the guard last saw you, from 1 (she just saw you) up to a maximum of 10 (she last saw you 10 or more turns ago).

While Alert Count is 1 and Alert Level is less than 1 (i.e. for the first 2 turns of a guard seeing you, or the first 4 turns of a guard hearing you), the guard will freeze, as if in thought.

After these first 2 / 4 turns (i.e. when the Alert Level gets to 1), the guard *should* chase you (at the moment they just return to random walking).

If a guard doesn't see or hear you for 10 turns (i.e the Alert Count has got to 10), their Alert Level is reset to zero.

Read the console logs to see Alert Count and Alert Level in action!

There's only one guard in this commit, in order to make the console logs more readable.