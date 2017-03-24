////////////////////////////////////////////////////////////////////////////////////////////////////
//Custm Link Formatter 
/////////////////////////////////////////////////////////////////////////////////////////////////////

var linkFormatterMap = function (row, cell, value, columnDef, dataContext) {
    return '<span class="link" onclick = OpenMap(event,"' + dataContext['id'] + '");>' + value + '</span>';
};

var linkFormatterDs = function (row, cell, value, columnDef, dataContext) {
    return '<span class="link" onclick = OpenDataSet(event,"' + dataContext['id'] + '")>' + value + '</span>';
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Coustm Date Formatter (mm/dd/yyyy)
/////////////////////////////////////////////////////////////////////////////////////////////////////
var DateFormatter = function (row, cell, value, columnDef, dataContext) {
    var val = new Date(value);
    return val.toLocaleDateString();//(val.getMonth() + 1) + "/" + val.getDate() + "/" + val.getFullYear();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Custom Sort Function for DateTime
/////////////////////////////////////////////////////////////////////////////////////////////////////
var sortDate = function (a, b) {
    var date_a = new Date(a[sortcol]);
    var date_b = new Date(b[sortcol]);
    var diff = date_a.getTime() - date_b.getTime();
    return sortdir * (diff === 0 ? 0 : (date_a > date_b ? -1 : 1));
}

var sortNumeric = function (a, b) {
    var x = (isNaN(a[sortcol].replace('$', '').replace('%', '').replace(',', '')) || a[sortcol] === "" || a[sortcol] === null) ? -99e+10 : parseFloat(a[sortcol].replace('$', '').replace('%', '').replace(',', ''));
    var y = (isNaN(b[sortcol].replace('$', '').replace('%', '').replace(',', '')) || b[sortcol] === "" || b[sortcol] === null) ? -99e+10 : parseFloat(b[sortcol].replace('$', '').replace('%', '').replace(',', ''));
    return sortdir * (x === y ? 0 : (x > y ? 1 : -1));
}


