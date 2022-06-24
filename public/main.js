const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: 'Sasuke',
        quote: "No man chooses evil because he is evil; he only mistakes it for happiness, the good he seeks." 
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then (response => {
    window.location.reload(true)
  })
})


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sasuke'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Sasuke quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })