export const onClickLeft = () => history.back()
const setInfo = (item)=>{
	item = JSON.stringify(item)
	localStorage.setItem("info",item)
}

