export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomIntInclusive,
    debounce,
   
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function makeId(length = 8) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function debounce(func, wait) {
    let timeout
  
    return function executedFunction(...args) {
      //rest-makes the args to an array
      const later = () => {
        clearTimeout(timeout)
        func(...args) //spread-from array to vars
      }
  
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }