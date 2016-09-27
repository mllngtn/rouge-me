# Rouge Me

#### By Ed Millington

This is a little rogue-lite project I'm working on to get better at JavaScript.

It's not guaranteed to work in all browsers at the mo, 'cause I'm learning myself a bit of ES6, which is super fun.

## Try it yourself

Open 'rouge.html' in Chrome, and use the arrow keys to wander about.

## What's happening?

You play the part of a friendly @ sign.

Watch out! There are guards patrolling about. Use your spidey senses to your advantage.

The game will tell you if you can see or hear a guard.

The guards can also see and hear you, and will chase you if you get all up in their grill.

Guards cannot see you if you are behind them.

If they lose track of you, they will return to their original patrol path.

If they catch you, you can see a delightful ASCII game over screen.

Er.. that's it.

### @

This is you. Hello, you!

### G 

This is a guard. Boooooo. Guards will patrol around until such time as they notice you.

### .

These tiles represent normal ground. You can be seen and heard a normal amount, as can guards on the same ground.

### / 

These tiles represent shadowy ground. You cannot be seen so easily if you are hidden in the shadows... but watch out. Guards can also conceal themselves in darkness.

### ,

These tiles represent grass. You cannot be heard so easily if you're shuffling around in the long grass... but watch out. Guards on the grass are also quieter.

Don't worry though. You can always see and hear just a little bit better than the guards. Natch.

## Guard Alert Levels

Guards have two alert variables: Alert Level and Alert Count.

###Alert Level 

Alert Level starts at 0, and goes up in increments every time a guard is aware of you (+0.25 if she hears you, +0.5 if she sees you).

Once Alert Level gets above 1, the guard will start chasing you.

###Alert Count

This is a variable which counts the number of turns since the guard last saw you, from 1 (she just saw you) up to a maximum of 10 (she last saw you 10 or more turns ago).

While Alert Count is 1 and Alert Level is less than 1 (i.e. for the first 2 turns of a guard seeing you, or the first 4 turns of a guard hearing you), the guard will freeze, as if in thought.

After these first 2 / 4 turns (i.e. when the Alert Level gets to 1), the guard will chase you.

If a guard doesn't see or hear you for 10 turns (i.e the Alert Count has got to 10), their Alert Level is reset to zero, and they go back to what they were doing before.

## Stuff what I nicked

Easystar: A* pathfinding in JS (https://github.com/prettymuchbryce/easystarjs)

Bresenham's algorithm for line of sight - from avok00 on StackOverflow (http://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript)

Hearing rectangle - from Ed Robinson's tutorial, which is how I started on this voyage of self discovery (https://gist.github.com/anotheredward/5895c31d007bda14b45fc5e3be694dcf)

## To Do Next

1) Build a little Level
2) Add a goal and a win-state
3) Make the guards more intelligent