const colorThief = require('colorthief')

const fetched_img_data = (await fetch("https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ca/b1/b0/cab1b068-f140-db12-fbe9-64001921a7dd/192641517174_Cover.jpg/1024x1024bb.jpg"))
const img_data = await fetched_img_data.blob()

// @ts-ignore
const avg_color = colorThief.getColor(img_data)