param([string]$BaseUrl='http://127.0.0.1:4000')
$ErrorActionPreference='Stop'
if($BaseUrl -notmatch '^http://(127\.0\.0\.1|localhost):\d+$'){throw 'Use a local demo server.'}
$health=Invoke-RestMethod "$BaseUrl/health"
if($health.database -ne 'connected'){throw 'MongoDB is not connected.'}
$id='DEMO-'+[guid]::NewGuid().ToString('N')
$record=@{courseId=$id;courseName='Synthetic SQL Practice';type='Assignment';details=@(@{details_columnName='Correctness';details_maxScore='100';details_notes='Synthetic smoke check'})}|ConvertTo-Json -Depth 5
try {
 $null=Invoke-RestMethod -Method Post "$BaseUrl/details/add" -ContentType application/json -Body $record
 $read=Invoke-RestMethod "$BaseUrl/details/$id"
 if($read.courseId -ne $id){throw 'Read did not return the created record.'}
 $null=Invoke-RestMethod -Method Delete "$BaseUrl/details/delete/$id/Assignment"
 $after=Invoke-RestMethod "$BaseUrl/details/$id"
 if($after){throw 'Demo record was not deleted.'}
 Write-Output 'MongoDB health and synthetic criteria create/read/delete passed.'
} finally {
 $null=Invoke-RestMethod -Method Delete "$BaseUrl/details/delete/$id/Assignment" -ErrorAction SilentlyContinue
}
