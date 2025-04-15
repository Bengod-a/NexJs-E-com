export const GetProvince = async () => 
    await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json').then(res => res.json())

export const GetAmphure = async (id:any) => {
  const res = await fetch(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json`)
    const data = await res.json()

    const filtered = data.filter((item: any) => item.province_id == id);
    return filtered
}

export const Gettambon = async (id:any) => {
  const res = await fetch(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`)
    const data = await res.json()

    const filtered = data.filter((item: any) => item.amphure_id == id);
    return filtered
}   