/* globals timer, stopwatch  */
'use strict';

const args = new URLSearchParams(location.search);
document.documentElement.classList.add(args.get('mode'));

// tabs
document.getElementById('tabs').addEventListener('change', e => {
  const {id} = e.target;
  document.body.dataset.tab = id;
  localStorage.setItem('stopwatch', id);
});

// plus button
document.getElementById('plus').addEventListener('click', () => {
  const {tab} = document.body.dataset;
  if (tab === 'alarm') {
    alarm.edit();
  }
});

// tools
document.addEventListener('click', e => {
  const {command} = e.target.dataset;
  const {tab} = document.body.dataset;

  if (tab === 'timer') {
    if (command === 'cancel') {
      timer.pause(true);
    }
    else if (command === 'resume') {
      timer.start();
    }
    else if (command) {
      timer[command]();
    }
  }
  else if (tab === 'stopwatch' && command) {
    stopwatch[command]();
  }
});

// close all notifications
chrome.runtime.sendMessage({
  method: 'remove-all-notifications'
});

// startup
document.body.dataset.tab = localStorage.getItem('stopwatch') || 'stopwatch';
document.getElementById(document.body.dataset.tab).click();
window.addEventListener('load', () => {
  document.body.dataset.ready = true;
});
