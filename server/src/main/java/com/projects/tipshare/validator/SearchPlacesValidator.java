package com.projects.tipshare.validator;

import org.springframework.beans.BeanWrapperImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SearchPlacesValidator implements ConstraintValidator<SearchPlacesConstraint, Object> {

    private String placeName;
    private String placeAddr;

    @Override
    public void initialize(SearchPlacesConstraint constraintAnnotation) {
        this.placeName = constraintAnnotation.placeName();
        ;
        this.placeAddr = constraintAnnotation.placeAddr();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext constraintValidatorContext) {
        System.out.println(obj);

        Object placeNameObj = new BeanWrapperImpl(obj)
                .getPropertyValue(placeName);

        Object placeAddrObj = new BeanWrapperImpl(obj)
                .getPropertyValue(placeAddr);

        System.out.println(placeNameObj);
        System.out.println(placeAddrObj);
        return false;
    }
}
