# UnicefRASAutomation
UnicefRASAutomation



below is the logic for position number and contract duration dependency
=========================================================================


If (Contract type == Fixed Term Position){
VA Job Specification\Contract Duration Type =  preset to months;
VA Job Specification\Contract Duration = 12 to 24 months
}    If (Contract type == Temporary Appointment){

VA Job Specification\Contract Duration Type =  months OR days => used should be able to change this;

if(Contract Duration Type == months){
VA Job Specification\Contract Duration = 1 to 11 months
}

if(Contract Duration Type == days){
VA Job Specification\Contract Duration = 1 to 364 days
}

}



below is the command to run multiple tests
===========================================
 npm run run-all-tests

 Note :: "run-all-tests"  should be configured in "scripts" section of pakage.json

 