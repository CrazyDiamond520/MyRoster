$("#find-roster").on("click", function(){
    const teamName = $("input").val()
    console.log(teamName)
    $.get(`teams/${teamName}`, function(roster){
        const source = $("#content").html()
        const template = Handlebars.compile(source)
        const teamContent = template({ teamRelevantData : roster })
        $(".main-content").append(teamContent)
    })
})