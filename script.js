document.addEventListener('DOMContentLoaded',()=>{
  const btn = document.getElementById('greetBtn');
  const drop = document.getElementById('dropArea');
  const player = document.getElementById('player');

  btn.addEventListener('click',()=>{
    alert('Hello from Suno!');
    document.body.classList.toggle('accent-flash');
    setTimeout(()=>document.body.classList.remove('accent-flash'),300);
  });

  // Drag & drop audio loading
  ['dragenter','dragover'].forEach(ev=>{
    drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('dragover')});
  });
  ['dragleave','drop'].forEach(ev=>{
    drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('dragover')});
  });

  drop.addEventListener('drop',e=>{
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if(!f) return;
    const url = URL.createObjectURL(f);
    player.src = url;
    player.play().catch(()=>{});
  });
});
