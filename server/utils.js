const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function groupByMonth(result, categories) {
    const groupByCat = []
    const groupByCategory = result.reduce((group, product) => {
        const { createdDate } = product;
        const month = new Date(createdDate).getUTCMonth();
        group[month] = group[month] ?? [];
        group[month].push(product);
        return group;
    }, {});
    let budgetSet = categories.reduce((t, cv) => t + cv.limit,0)
    for (const [key, value] of Object.entries(groupByCategory)) {
        value.reduce((ac, cv) =>  {
            ac + cv.amount
        }, 0)
        groupByCat.push({month: monthNames[key], amount: value.reduce((ac, cv) =>  ac + cv.amount, 0), limit: budgetSet})
    }
    return groupByCat
}


module.exports = {
    groupByMonth
}