const axios = require('axios')
const fs = require('fs')
const _ = require('lodash')

const endpoint = 'https://api.trip2.jp/ex/tokyo/v1.0/json'

// const list = JSON.parse(fs.readFileSync('./list.json', 'utf8'))
const list = JSON.parse(fs.readFileSync('./listMini.json', 'utf8'))

const allTimeDataBase = {}


async function main() {
  list.forEach(async (src, indexSrc) => {
    console.log(src)
    allTimeDataBase[src] = []
    // const arr = []
    await list.forEach(async (dst, indexDst) => {
      console.log(`${src} => ${dst}`)
      if(indexSrc === indexDst) return

      axios.get(endpoint, {
        params: {
          src,
          dst,
          key: 'test'
        }
      }).then(response => {
        // console.log(response.data)
        // console.log(JSON.stringify(response.data, null, 2))
        const time = response.data.ways.reduce((acc, way) => {
          // console.log(way.min)
          return acc + way.min
        }, 0)
        // console.log(time)
        allTimeDataBase[src] = { src, dst, time }
      })
    })
  })
}
// console.log('allTimeDataBase')

// const model = {
//   src: '渋谷',
//   dst: '松戸',
//   time: 50
// }


function getTime(src, dst) {
  return axios.get(endpoint, {
    params: {
      src,
      dst,
      key: 'test'
    }
  })
}

// axios
//   .get(endpoint, {
//     params: {
//       src: '下北沢',
//       dst: '所沢',
//       key: 'test'
//     }
//   })
//   .then(response => {
//     // console.log(response.data)
//     console.log(JSON.stringify(response.data, null, 2))
//     const time = response.data.ways.reduce((acc, way) => {
//       console.log(way.min)
//       return acc + way.min
//     }, 0)
//     console.log(time)
//   })
