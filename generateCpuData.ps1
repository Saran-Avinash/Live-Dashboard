

	$totalRam = (Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property capacity -Sum).Sum
while($true) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $cpuTime = (Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples.CookedValue
    $availMem = (Get-Counter '\Memory\Available MBytes').CounterSamples.CookedValue
    $date + ' > CPU: ' + $cpuTime.ToString("#,0.000") + '%, Avail. Mem.: ' + $availMem.ToString("N0") + 'MB (' + (104857600 * $availMem / $totalRam).ToString("#,0.0") + '%)'

    $JSON = @{ 

	"date" = $date
	"cpu" = $cpuTime
	"memory" = $availMem

	} | ConvertTo-Json

     Invoke-WebRequest -Uri "http://localhost:8080/api/cpuData" -Method Post -Body $JSON -ContentType "application/json"
    Start-Sleep -s 1
}

