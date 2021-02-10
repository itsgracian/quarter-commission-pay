const { format, getYear } = require('date-fns');

var eachQuarterOfInterval = require('date-fns/eachQuarterOfInterval')

const paymentType = {
  monthly: 'monthly',
  year: 'year'
};

const formatDate = (value)=>{
  return format(new Date(value), 'MM/dd/yyyy');
}

const d = [
  {
  year: 2020,
  payment: [{
  paidOn: formatDate('2020,01,15'),
  nextPayment: formatDate('2020,05,15'),
  amount: 100,
  }, {
  paidOn: formatDate('2020,05,15'),
  nextPayment: formatDate('2020,06,15'),
  amount: 30,
  }, {
  paidOn: formatDate('2020,03,15'),
  nextPayment: formatDate('2020,06,15'),
  amount: 30,
  }, , {
  paidOn: formatDate('2020,12,15'),
  nextPayment: formatDate('2020,06,15'),
  amount: 50,
  }]
},
  {
  year: 2021,
  payment: [{
  paidOn: formatDate('2021,08,15'),
  nextPayment: formatDate('2021,05,15'),
  amount: 200,
  }, {
  paidOn: formatDate('2021,01,15'),
  nextPayment: formatDate('2021,06,15'),
  amount: 30,
  }, {
  paidOn: formatDate('2021,06,15'),
  nextPayment: formatDate('2021,07,15'),
  amount: 30,
  }]
}
];

const func = (qs)=>{
 
 let q1Total = 0;

 let q2Total = 0;

 let q3Total = 0;

 let q4Total = 0;

 const p = [];

 for(const i in qs){
   if(qs[i].q === 1){
     q1Total = q1Total + qs[i].amount;
   }

   if(qs[i].q ===2){
     q2Total = q2Total + qs[i].amount;
   }

   if(qs[i].q === 3){
     q3Total = q3Total + qs[i].amount;
   }

   if(qs[i].q === 4){
     q4Total = q4Total + qs[i].amount;
   }
 }

 if(q1Total!==0){
  p.push({
    q: 1,
    tot: Math.ceil((q1Total * 10) / 100)
  });
 }

  if(q2Total!==0){
    p.push({
    q: 2,
    tot: Math.ceil((q2Total * 10) / 100)
  });
 }

  if(q3Total!==0){
    p.push({
    q: 3,
    tot: Math.ceil((q3Total * 10) / 100)
  });
 }

 if(q4Total!==0){ 
    p.push({
    q: 4,
    tot: Math.ceil((q4Total * 10) / 100)
  });
 }


//  console.log(p);
return p;
};


let finalRes = [];
let quarters = [];

for(const i in d){
  const payment = d[i].payment;

  let ds = {};

  let quarters=[];

  for(const j in payment){

    ds.year=d[i].year;

    var date = new Date(payment[j].paidOn);

    var quarter =  parseInt(date.getMonth() / 3 ) + 1;

      quarters.push({
      q: quarter,
      amount: payment[j].amount
    });


    ds.quarters = quarters;
    
  }

  // console.log(ds);
  const qP = func(ds.quarters);

  delete ds.quarters;

  ds.quarters = qP;

  console.log(ds);

  finalRes.push(ds);
}

//// final response
// const res = [{
//   year: 2020,
//   quarters: [{
//     q: 1,
//     tot: 50
//   }, {
//     q: 2, tot: 100
//   }]
// }];