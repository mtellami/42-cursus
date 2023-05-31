/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RobotomyRequestForm.cpp                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mtellami <mtellami@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/04/13 05:49:55 by mtellami          #+#    #+#             */
/*   Updated: 2023/05/14 15:01:31 by mtellami         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "RobotomyRequestForm.hpp"

// Constructor
RobotomyRequestForm::RobotomyRequestForm(const std::string target )
    : AForm( "Robotomy Request", 72, 45 ), _target( target ) {
}

// Copy constructor
RobotomyRequestForm::RobotomyRequestForm( const RobotomyRequestForm& obj )
: AForm( obj ), _target( obj._target ) {
}

// Copy assignment operator
RobotomyRequestForm& RobotomyRequestForm::operator=( const RobotomyRequestForm& obj ) {
    ( void )obj;
    return *this;
}

// Destructor
RobotomyRequestForm::~RobotomyRequestForm( void ) {
}

// Member functions
void RobotomyRequestForm::execute( const Bureaucrat& executor ) const {
    if (executor.getGrade() > this->getGradeToExecute())
        throw AForm::GradeTooLowException();
    if (!this->getSigned())
        throw AForm::FormNotSignedException();
	srand(time(nullptr));
    if (rand() % 2)
        std::cout << "Robotomy " << _target << " has been robotomized successfully." << std::endl;
    else
        std::cout << "Robotomy " << _target << " has failed to be robotomized." << std::endl;
}
