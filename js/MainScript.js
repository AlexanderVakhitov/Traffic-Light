var config = 
{
    timeout : 
	{
        green 	: 6000,
        yellow 	: 2000,
        red		: 6000
    },
    order :
	[
		'green', 'yellow', 'red'
	],
	tram :
	{
		wait  : 3000,
		time  : 10000,
		smart : 0.3
	}
};

var lights = new Lights(config);

var tramEvent = new EventEmitter();
	lights.startListenTram(tramEvent);

var start = function()
{
    var interval = setInterval(function()
    {
        var currentColor = lights.state();

        switch(currentColor)
        {
            case 'green':
                document.getElementById('green').className = "on";
                document.getElementById('yellow').className = "off";
                document.getElementById('red').className = "off";
                break;
            case 'yellow':
                document.getElementById('green').className = "off";
                document.getElementById('yellow').className = "on";
                document.getElementById('red').className = "off";
                break;
            case 'red':
                document.getElementById('green').className = "off";
                document.getElementById('yellow').className = "off";
                document.getElementById('red').className = "on";
                break;
        }

    }, 100);
};

var tramGo = function()
{
    tramEvent.emit('tram');

    var timeoutWait =  setTimeout(function()
    {
        var tramElem = document.getElementById('tram');
        var tramTime = (config.tram.time / 1000).toString();

        tramElem.style.transition = "all "+tramTime+"s ease-in-out";
        tramElem.style.transform = "translate(1100px, 0)";

        var timeoutDelete = setTimeout(function()
        {
            tramElem.style.transition = "";
            tramElem.style.transform = "";
        }, config.tram.time);
    }, config.tram.wait);
};