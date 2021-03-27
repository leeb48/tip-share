package com.projects.tipshare.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = SearchPlacesValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface SearchPlacesQueryConstraint {

    String message() default "Must have at least one search field";

    String placeName();

    String placeAddr();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
