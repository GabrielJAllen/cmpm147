// project.js - Error message generator
// Author: Gabriel Allen (Vivian)
// Date: 4/8/25


const fillers = {
  concern: ["Somehow","It would seem","By some grace of god","Hopefully by accident","Through immense incompetence","I don't know how, but","Oh deary","Whoopsie Daisy","How in the **** did"],
  action: ["deleted", "NULL-ed", "spontatenously created", "incorrectly modified", "bypassed", "overwrote", "completely evaporated", "sent out the airlock", "botched", "FUBAR-ed"],
  object: ["file", "folder", "pig", "rogue AI", "black hole", "google doc", "new religion", "new computer", "NASA aircraft", "third-world nation's economy", "box of mangoes", "me"],
  recommendation: ["I'd suggest", "To fix this", "The bible states", "If you were wise", "In my infinite wisdom I'd recommend", "If you'd like to resolve this", "To appease the gods"],
  course: ["should ctrl-z", "need to contact the CIA", "have to commit a blood sacrifice", "should bath your computer", "need to get outside", "have to find someone more capable", "should step away from the keyboard"]
};

const template = `Error:
$concern you $action a $object 
$recommendation you $course`;

// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);
}

/* global clicker */
$("#clicker").click(generate);

generate();
