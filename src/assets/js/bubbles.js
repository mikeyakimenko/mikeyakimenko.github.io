const randomNumber = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min

const randomArrayElement = (arr) => arr[Math.floor(Math.random()*arr.length)]

const LABELS = [
  'Python',
  'HTML',
  'CSS',
  'JS',
  'React',
  'Java',
  'Db'
]

const COLORS = [
  {
    background: '#1abc9c',
    color: 'white'
  },
  {
    background: '#2ecc71',
    color: 'white'
  },
  {
    background: '#3498db',
    color: 'white'
  },
  {
    background: '#9b59b6',
    color: 'white'
  },
  {
    background: '#34495e',
    color: 'white'
  },
  {
    background: '#16a085',
    color: 'white'
  },
  {
    background: '#27ae60',
    color: 'white'
  },
  {
    background: '#2980b9',
    color: 'white'
  },
  {
    background: '#8e44ad',
    color: 'white'
  },
  {
    background: '#2c3e50',
    color: 'white'
  },
  {
    background: '#f1c40f',
    color: 'white'
  },
  {
    background: '#e67e22',
    color: 'white'
  },
  {
    background: '#e74c3c',
    color: 'white'
  },
  {
    background: '#f39c12',
    color: 'white'
  },
  {
    background: '#d35400',
    color: 'white'
  },
  {
    background: '#c0392b',
    color: 'white'
  },
  {
    background: '#7f8c8d',
    color: 'black'
  }
]

const bubblesContainer = document.querySelector('#bubbles')
const fragment = document.createDocumentFragment()

for (let i=0; i<11; i++) {
  const scaleSize = randomNumber(7, 3)
  const colorsIndex = randomArrayElement(COLORS)
  const bubble = document.createElement('div')
  const span = document.createElement('span')
  const animate = `moves ${randomNumber(6, 1)}s ease ${randomNumber(3, 1)}s infinite`

  console.log(animate)
  
  span.innerText = randomArrayElement(LABELS).toUpperCase()

  bubble.appendChild(span)
  bubble.classList.add('bubble')
  bubble.style.transform = `scale(0.${scaleSize})`
  bubble.style.backgroundColor = colorsIndex.background
  bubble.style.color = colorsIndex.color
  bubble.style.left = `calc(${randomNumber(100, 0)}% - 100px)`
  bubble.style.animation = animate
  fragment.appendChild(bubble)
}

bubblesContainer.appendChild(fragment)
