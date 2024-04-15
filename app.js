document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Validate inputs
    let income = parseFloat(document.getElementById('income').value);
    let extraIncome = parseFloat(document.getElementById('extraIncome').value);
    let deductions = parseFloat(document.getElementById('deductions').value);
    let age = document.getElementById('age').value;
    
    let errors = false;
    
    if (isNaN(income) || isNaN(extraIncome) || isNaN(deductions) || !age) {
      errors = true;
      if (isNaN(income)) document.getElementById('incomeError').style.display = 'inline-block';
      if (isNaN(extraIncome)) document.getElementById('extraIncomeError').style.display = 'inline-block';
      if (isNaN(deductions)) document.getElementById('deductionsError').style.display = 'inline-block';
      if (!age) document.getElementById('ageError').style.display = 'inline-block';
    } else {
      // Hide error icons if no errors
      document.querySelectorAll('.error-icon').forEach(icon => {
        icon.style.display = 'none';
      });
    }
    
    if (!errors) {
      // Calculate overall income
      let overallIncome = income + extraIncome - deductions;
  
      // Calculate tax
      let taxRate = 0;
      if (overallIncome > 8) {
        if (age === 'under40') {
          taxRate = 0.3;
        } else if (age === '40to60') {
          taxRate = 0.4;
        } else {
          taxRate = 0.1;
        }
      }
      let tax = overallIncome > 8 ? taxRate * (overallIncome - 8) : 0;
      
      // Display modal with tax amount
      let modalBody = document.getElementById('modalBody');
      modalBody.innerHTML = `
        <h5> ${tax.toFixed(2)}</h5>
       `
      let modal = new bootstrap.Modal(document.getElementById('taxModal'), { keyboard: false });
      modal.show();
    }
  });
  