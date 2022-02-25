const InputCapitalize = {
  bind: (el: any, binding: any) => {
    el.addEventListener('keyup', (event: any) => {
      event = event || window.event
      const value = event.target.value
      if (binding.value === 'uppercase') {
        event.target.value = value.toUpperCase()
      } else if (binding.value === 'lowercase') {
        event.target.value = value.toLowerCase()
      } else if (binding.value === 'words') {
        const character = ' '
        const words = value.split(character)
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
        }
        event.target.value = words.join(character)
      } else {
        event.target.value = value.charAt(0).toUpperCase() + value.slice(1)
      }
    })
  }
}

export default InputCapitalize
