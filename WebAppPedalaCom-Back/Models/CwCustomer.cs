﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAppPedalaCom.Models;

public partial class CwCustomer
{
    [Key]
    public int CustomerId { get; set; }

    public string? Title { get; set; }

    public string? FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

    public string? CompanyName { get; set; }

    public string? EmailAddress { get; set; }

    public string? Phone { get; set; }

    public string? PasswordHash { get; set; }

    public string? PasswordSalt { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public void UpdateCustomer(CwCustomer customer)
    {
        this.Title = customer.Title;
        this.FirstName = customer.FirstName;
        this.LastName = customer.LastName;
        this.CompanyName = customer.CompanyName;
        this.EmailAddress = customer.EmailAddress;
        this.Phone = customer.Phone;
        this.PasswordHash = customer.PasswordHash;
        this.PasswordSalt = customer.PasswordSalt;
        this.ModifiedDate = DateTime.UtcNow;
    }
}
