document.getElementById('menuBtn').addEventListener('click', function(){
  const nav = document.querySelector('nav');
  if(nav.classList.contains('hidden')) nav.classList.remove('hidden');
  else nav.classList.add('hidden');
});

document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('This is a demo contact form. In the full app this would send a message to the server.');
  this.reset();
});
