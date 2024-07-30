function viewYarn(yarnID) {
    console.log("Hit yarn func")
    console.log(yarnID)
    const data = {id: yarnID}
    console.log("data=" + JSON.stringify(data))
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/yarnInfo/${yarnID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.onreadystatechange = () => {
    //     if (xhttp.readyState == 4 && xhttp.status == 204) {
    //         location.reload()
    //     }
    //     else if (xhttp.readyState == 4 && xhttp.status != 204) {
    //         console.log("There was an error with the input.")
    //     }
    // }
    // location.replace(
    //     "http://classwork.engr.oregonstate.edu:21211/yarnInfo?",
    //   );
    xhttp.send(JSON.stringify(data));
  }